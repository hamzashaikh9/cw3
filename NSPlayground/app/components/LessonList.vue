<template>
    <ListView for="lesson in lessons" @itemTap="onItemTap"
        style="color:black;height:100%">
        <v-template>
            <Stacklayout columns="60, auto, *" rows="100, auto, *" width="500"
                height="230" backgroundColor="steelblue">
                <Image height="30%"
                    :src="`https://cst3010.herokuapp.com/${lesson.image}`"
                    width="50%" />
                <Label :text="`${lesson.subject}`"
                    horizontalAlignment="center" />
                <Label :text="`Location: ${lesson.location}`"
                    horizontalAlignment="center" />
                <Label :text="`Price: ${lesson.price}`"
                    horizontalAlignment="center" />
                <Label
                    :text="`Available Space: ${lesson.NumberOfSpace}`"
                    horizontalAlignment="center" />
            </Stacklayout>
        </v-template>
    </ListView>
</template>

<script>
    export default {
        data() {
            return {
                lessons: []
            };
        },
        methods: {
            onItemTap(event) {
                this.$emit("addProduct", event.item);
            }
        },
        created: function() {
            let webstore = this;
            fetch("https://cst3010.herokuapp.com/collection/lessons/")
                .then(
                    function(response) {
                        console.log("Data is transmitting.");
                        response.json().then(function(json) {
                            webstore.lessons = json;
                        });
                    }
                );
        }
    };
</script>