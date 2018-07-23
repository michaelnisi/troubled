# Makefile - generate site

UGLIFYJS=node_modules/uglify-js/bin/uglifyjs

BUILD=/tmp/troubled
MODERNIZE=resources/js/modernizr.js
NORMALIZE=resources/css/normalize.css
RESPOND=resources/js/respond.js
RESPONDJS=node_modules/respond.js/dest/respond.src.js
SCRIPT=resources/js/script.min.js
STYLE=resources/css/style.css
SYNTAX=resources/css/syntax.css

.PHONY: all
all: $(BUILD)

$(SCRIPT):
	$(UGLIFYJS) src/script.js -o $(SCRIPT) --compress

$(STYLE):
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
	rm $(SCRIPT) $(STYLE) $(NORMALIZE) $(MODERNIZE) $(RESPOND) $(SYNTAX)
	rm -rf $(BUILD)
