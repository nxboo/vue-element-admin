<template>
    <i class="philm-font" :class="iconName" :style="style"></i>
</template>

<script>
    import lodash from 'lodash';

    export default {
        name: 'philm-icon',
        props: {
            icon: {
                type: String,
                required: true
            },
            color: {
                type: String
            },
            size: {
                type: String
            },
        },
        computed: {
            iconName() {
                return `philm-font-${this.icon}`
            },
            style(){
                let style = {};
                if(this.color){
                    style.color = this.color;
                }

                let size = this.size;
                if(size){
                    switch(size){
                        case 'big':
                            size = '1.5rem'
                            break;
                        case 'small':
                            size = '.7rem'
                            break;
                    }
                    if(lodash.isNumber(size)){
                        size += 'px';
                    }
                    style.fontSize = size;
                }
                return style;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
