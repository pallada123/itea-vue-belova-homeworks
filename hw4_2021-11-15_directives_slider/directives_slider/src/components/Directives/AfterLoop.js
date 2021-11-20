const afterLoop = {

    bind: (el, binding) => {

        let {value} = binding;

        if (value.listLength - 1 === value.i) {

            setTimeout(() => {
                const parent = el.parentNode;
                const tag = el.tagName;
                value.callback(tag, parent);
            }, 0);
        };

    }
}

export default afterLoop