const classBuilder = (el, binding) => {

    let {value, arg} = binding;

    const elClasses = el.classList;

    elClasses.forEach(function (item) {
        if (item.indexOf('_') === -1) {
            el.classList.add(item + '_' + arg + '_'+ value);
        }
    });

}

export default classBuilder