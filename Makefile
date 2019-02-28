# Makefile - generate site

UGLIFYJS=node_modules/uglify-js/bin/uglifyjs

TMP=/tmp/troubled
CSS=resources/css
JS=resources/js

MODERNIZE=$(JS)/modernizr.js
NORMALIZE=$(CSS)/normalize.css
RESPOND=$(JS)/respond.js
RESPONDJS=node_modules/respond.js/dest/respond.src.js
SCRIPT=$(JS)/script.min.js
STYLE=$(CSS)/style.css
SYNTAX=$(CSS)/syntax.css

$(TMP): scripts stylesheets
	blake $(TMP)

.PHONY: stylesheets
stylesheets: $(STYLE) $(SYNTAX) $(NORMALIZE)
	mv $(STYLE) $(CSS)/style.$(shell md5 -q $(STYLE)).css
	mv $(SYNTAX) $(CSS)/syntax.$(shell md5 -q $(SYNTAX)).css
	mv $(NORMALIZE) $(CSS)/normalize.$(shell md5 -q $(NORMALIZE)).css

.PHONY: scripts
scripts: $(SCRIPT) $(MODERNIZE) $(RESPOND)

# JavaScript

$(JS):
	mkdir -p $(JS)

$(SCRIPT): $(JS)
	$(UGLIFYJS) src/script.js -o $(SCRIPT) --compress

$(MODERNIZE): $(JS)
	npm run modernize

$(RESPOND): $(JS)
	$(UGLIFYJS) $(RESPONDJS) -o $(RESPOND) --compress

# CSS

$(CSS):
	mkdir -p $(CSS)

$(STYLE): $(CSS)
	sassc src/style.scss $(STYLE) -t compressed

$(NORMALIZE):
	npm run normalize

$(SYNTAX): $(CSS)
	npm run syntax

# Remove

.PHONY: clean
clean:
	rm $(SCRIPT) $(MODERNIZE) $(RESPOND)
	rm -rf $(TMP)
	rm -rf $(CSS)
