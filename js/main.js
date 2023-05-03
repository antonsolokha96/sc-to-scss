// functional styled-components to scss parser

document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#input')
    const output = document.querySelector('#output')
    const button = document.querySelector('#submit')

    // parse function

    // example:
    // input:
    // position: 'relative',
    //   textAlign: 'end',
    //   padding: '8px 0',
    //   margin: '0 16px',
    //   '& span': {
    //     background: '#fff',
    //     position: 'relative',
    //     zIndex: 1,
    //     padding: '0 0 0 8px',
    //     fontWeight: 600,
    //     fontSize: '13px',
    //     lineHeight: '18px',
    //     color: '#444444',
    //   },
    //   '&:before': {
    //     content: '""',
    //     zIndex: 0,
    //     position: 'absolute',
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     top: 0,
    //     margin: 'auto 0',
    //     width: '100%',
    //     height: 1,
    //     background: '#444444',
    //   },
    //
    // output:
    // position: relative;
    // text-align: end;
    // padding: 8px 0;
    // margin: 0 16px;
    // & span {
    //     background: #fff;
    //     position: relative;
    //     z-index: 1;
    //     padding: 0 0 0 8px;
    //     font-weight: 600;
    //     font-size: 13px;
    //     line-height: 18px;
    //     color: #444444;
    // }
    // &:before {
    //     content: "";
    //     z-index: 0;
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     top: 0;
    //     margin: auto 0;
    //     width: 100%;
    //     height: 1px;
    //     background: #444444;
    // }


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
        console.log(jsonInput)
        const parsedInput = JSON.parse(jsonInput);
        // Convert the JSON object to a CSS string
        let cssString = '';
        for (const [key, value] of Object.entries(parsedInput)) {
            if (typeof value === 'object') {
                cssString += `${key} {\n`;
                for (const [subkey, subvalue] of Object.entries(value)) {
                    cssString += `  ${camelToKebab(subkey)}: ${subvalue === '' ? '""' : subvalue};\n`;
                }
                cssString += '}\n';
            } else {
                cssString += `${camelToKebab(key)}: ${value === '' ? '""' : value};\n`;
            }
        }
        return cssString;
    }




    button.addEventListener('click', () => {
        output.value = parse(input.value)
    })

});