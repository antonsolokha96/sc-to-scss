// functional styled-components to scss parser

document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#input')
    const output = document.querySelector('#output')
    const button = document.querySelector('#submit')


    function camelToKebab(str) {
        return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    }

    function parse(input) {
        // Replace single quotes with double quotes to make it valid JSON
        // Parse the input string as JSON
        const jsonInput = `{
            ${input
            .replace(/'/g, '"')
            .replace(/(?<=^|\n)\s*('[^']*'|\w+)\s*:/g, '"$1":')
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']')
            .replace(/,\s*$/g, '')
            .replace(/""""/g, '""')}
            }`

        const parsedInput = JSON.parse(jsonInput);
        // Convert the JSON object to a CSS string

        const format = (obj, deep = 0) => {

            return Object.entries(obj).reduce((acc, [key, value]) => {
                const indent = new Array(deep).fill('  ').join('')
                if (typeof value === 'object') {
                    acc += `${indent}${key} {\n`;
                    acc += format(value, deep + 1);
                    acc += `${indent}}\n`;
                } else {
                    acc += `${indent}${camelToKebab(key)}: ${value === '' ? '""' : value};\n`;
                }
                return acc;
            }
            , '');
        }


        return format(parsedInput);
    }




    button.addEventListener('click', () => {
        output.value = parse(input.value)
    })

});
