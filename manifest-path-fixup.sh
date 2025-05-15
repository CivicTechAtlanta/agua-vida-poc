#!/bin/bash

echo 'fixing manifest.json path in generated html files...'

for html in $(find ./out -iregex '.*\.html' -not -wholename '*/404.html')
do
    sed -i -e 's/\/manifest.json/\/agua-vida-poc\/manifest.json/' $html
    echo "fixed $html"
done

echo "done"