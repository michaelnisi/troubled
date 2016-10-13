# Makefile - generate site

BUILD=/tmp/troubled
MODERNIZE=resources/js/modernizr.js
NORMALIZE=resources/css/normalize.css
RESPOND=resources/js/respond.js
SCRIPT=resources/js/script.min.js
STYLE=resources/css/style.css
SYNTAX=resources/css/syntax.css

.PHONY: all
all: $(BUILD)

$(SCRIPT):
	uglifyjs src/script.js -o $(SCRIPT) --compress

$(STYLE):
	sassc src/style.scss $(STYLE) -t compressed

$(NORMALIZE):
	npm run normalize

$(MODERNIZE):
	npm run modernize

$(SYNTAX):
	npm run syntax

$(RESPOND):
	uglifyjs node_modules/respond.js/dest/respond.src.js -o $(RESPOND) --compress

$(BUILD): $(SCRIPT) $(STYLE) $(NORMALIZE) $(MODERNIZE) $(RESPOND) $(SYNTAX)
	blake $(BUILD)

.PHONY: clean
clean:
	rm $(SCRIPT) $(STYLE) $(NORMALIZE) $(MODERNIZE) $(RESPOND) $(SYNTAX)
	rm -rf $(BUILD)
