<template>
    <div>
        <a href="javascript:;" @click="toggleClick" :class="{'is-active':isActive}" class="hamburger">
            <philm-icon icon="indentincrease"></philm-icon>
        </a>
    </div>
</template>

<script>
    import PhilmIcon from "../Icon-svg/philm-icon";
    export default {
        components: {PhilmIcon},
        name: 'hamburger',
        props: {
            isActive: {
                type: Boolean,
                default: false
            },
            toggleClick: {
                type: Function,
                default: null
            }
        }
    }
</script>

<style scoped>
    .hamburger {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        display: block;
        float: left;
        cursor: pointer;
        transform: rotate(0deg);
        transition: .38s;
        transform-origin: 50% 50%;
    }

    .hamburger.is-active {
        transform: rotate(180deg);
    }
</style>
