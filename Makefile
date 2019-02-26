# Makefile - generate site

UGLIFYJS=node_modules/uglify-js/bin/uglifyjs

BUILD=/tmp/troubled
CSS=resources/css
JS=resources/js

MODERNIZE=$(JS)/modernizr.js
NORMALIZE=$(CSS)/normalize.css
RESPOND=$(JS)/respond.js
RESPONDJS=node_modules/respond.js/dest/respond.src.js
SCRIPT=$(JS)/script.min.js
STYLE=$(CSS)/1551164594349.css
SYNTAX=$(CSS)/syntax.css

.PHONY: all
all: $(BUILD)

$(SCRIPT):
	$(UGLIFYJS) src/script.js -o $(SCRIPT) --compress

$(STYLE):
	mkdir -p $(CSS)
	sassc src/style.scss $(STYLE) -t compressed

$(NORMALIZE):
	npm run normalize

$(MODERNIZE):
	npm run modernize

$(SYNTAX):
	npm run syntax

$(RESPOND):
	$(UGLIFYJS) $(RESPONDJS) -o $(RESPOND) --compress

$(BUILD): $(SCRIPT) $(STYLE) $(NORMALIZE) $(MODERNIZE) $(RESPOND) $(SYNTAX)
	blake $(BUILD)

.PHONY: clean
clean:
	rm $(SCRIPT) $(NORMALIZE) $(MODERNIZE) $(RESPOND)
	rm -rf $(BUILD)
	rm -rf $(CSS)
