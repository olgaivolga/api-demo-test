function isObject(value) {
    return value !== null && typeof value === 'object' && !(value instanceof Date);
}
let isArray = Array.isArray;

function allTypes(obj, stack, parent) {
    Object.keys(obj).forEach(function(el) {
      if(isObject(obj[el]) && !isArray(obj[el])) {
        let p = parent ? parent + '.' + el : parent;
        allTypes(obj[el], stack, p || el);
    } else if(isArray(obj[el]) && isObject(obj[el][0])) {
        let p = parent ? parent + '.' + el : parent;
        allTypes(obj[el][0], stack, p || el);
    } else {
        let key = parent ? parent + '.' + el : el;
        let type = typeof obj[el];
        if(obj[el] == null) { type = null; }
        stack[key] = type;
      }
    });
    return stack;
}

module.exports.diff_types = function diff_types(obj1, obj2) {
    let types1 = allTypes(obj1, {}, null)
    let types2 = allTypes(obj2, {}, null)
    let keys_mismatched_types = [];
    Object.keys(types1).forEach(function(el) {
        if(el in types2 && types1[el] !== null) {
            if(types1[el] !== types2[el]) {
                console.log('API:');
                console.log(el + ': ' + types1[el]);
                console.log('Schema:');
                console.log(el + ': ' + types2[el]);
                keys_mismatched_types.push({[el]: types1[el]});
            }
        }
    })
    return keys_mismatched_types;
}
