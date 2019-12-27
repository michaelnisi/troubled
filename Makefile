# Makefile - generate site

UGLIFYJS=node_modules/uglify-js/bin/uglifyjs
RESPONDJS=node_modules/respond.js/dest/respond.src.js

TMP=/tmp/troubled

CSS=resources/css
NORMALIZE=$(CSS)/normalize.css
STYLE=$(CSS)/style.css
SYNTAX=$(CSS)/syntax.css

JS=resources/js
MODERNIZE=$(JS)/modernizr.js
RESPOND=$(JS)/respond.js
SCRIPT=$(JS)/script.min.js

# Building a temporary site

$(TMP): scripts stylesheets
	./node_modules/blake/bin/cli.js $(TMP)

# Install

node_modules:
	npm i

# Updating static resources

.PHONY: stylesheets
stylesheets: $(STYLE) $(SYNTAX) $(NORMALIZE)
	mv $(STYLE) $(CSS)/style.$(shell md5 -q $(STYLE)).css
	mv $(SYNTAX) $(CSS)/syntax.$(shell md5 -q $(SYNTAX)).css
	mv $(NORMALIZE) $(CSS)/normalize.$(shell md5 -q $(NORMALIZE)).css
	./css.sh

.PHONY: scripts
scripts: node_modules $(SCRIPT) $(MODERNIZE) $(RESPOND)

# Generating JavaScript files

$(JS):
	mkdir -p $(JS)

$(SCRIPT): $(JS)
	$(UGLIFYJS) src/script.js -o $(SCRIPT) --compress

$(MODERNIZE): $(JS)
	npm run modernize

$(RESPOND): $(JS)
	$(UGLIFYJS) $(RESPONDJS) -o $(RESPOND) --compress

# Generating CSS files

$(CSS):
	mkdir -p $(CSS)

$(STYLE): $(CSS)
	sassc src/style.scss $(STYLE) -t compressed

$(NORMALIZE):
	npm run normalize

$(SYNTAX): $(CSS)
	npm run syntax

# Synchronizing local /tmp site with S3 bucket

.PHONY: deploy
deploy:
	aws s3 sync /tmp/troubled s3://troubled.pro

# Removing all artifacts

.PHONY: clean
clean:
	rm $(SCRIPT) $(MODERNIZE) $(RESPOND)
	rm -rf $(TMP)
	rm -rf $(CSS)
