{
  "title": "Step",
  "description": "Painless parallel execution, serial execution, and error handling",
  "template": "article.jade",
  "date": "2011-10-25"
}
$end
The step library exports a single function I call step. It accepts any number of functions as arguments and runs them in serial order using the passed in this context as the callback to the next step.

    step(
        function() {
            fs.readFile(filename, 'utf8', this.parallel());
            fs.readdir(dir, this.parallel());
        },
        function(err, data, names) {
            if (err) throw err;
            rss = jade.compile(data, { filename:filename, pretty:true });
            var group = this.group();
            names.forEach(function(name) {
                addItem(dir + '/' + name, items, group());
            });
        },
        function(err, files) {
            if (err) throw err;
            result = rss({ items:items });
            var filename = target + '/rss.xml';
            console.log('Write ' + filename);
            fs.writeFile(filename, result, this);
        },
        function(err) {
            callback(err, true);
        }
    );
