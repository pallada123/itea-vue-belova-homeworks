export const PushToStorage = btn => ({
    name: 'PushToStorage',

    methods: {

        /**
         * выводит текст из инпута в консоль и добавляет в LS
         * @param val - значение, введеное в инпуте и переданое сюда через атрибут val
         */
        updateData(val) {
            console.log(val);

            let storageName = 'texts';

            let data = [];

            if (localStorage.getItem(storageName)) {
                data = JSON.parse(localStorage.getItem(storageName));
            }

            data.push(val);

            localStorage.setItem(storageName, JSON.stringify(data));
        }
    },

    render(h) {
        const vm = this
        return h(
            btn,
            {
                nativeOn: {
                    click: () => {
                        vm.updateData(vm.$attrs.val);
                    }
                }
            },
            vm.$slots.default
        )
    }
})