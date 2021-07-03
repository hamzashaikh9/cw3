<template backgroundColor= "gray">
    <StackLayout backgroundColor="gray">
        <Label class="h2 text-center" text="Shopping Cart" />
        <Label class="h2 text-center" text="(Tap a product to remove it)" />
        <ListView for="lesson in cart" @itemTap="onItemTap" height="60%">
            <v-template>
                <StackLayout>
                    <Label :text="lesson.subject" />
                    <Label :text="`Price: ${lesson.price}`" />
                    <Label
                        :text="`Available Space: ${lesson.NumberOfSpace}`" />
                </StackLayout>
            </v-template>
        </ListView>
        <TextField hint='Enter Your Name...' v-model='name' required
            keyboardType="email" />
        <TextField hint='Enter Your Number...' v-model='number' required
            keyboardType="integer" />
        <Button @tap='submitOrder' text='Submit Order' ios:color="steelblue"
            android:color="steelblue" />
    </StackLayout>
</template>

<script>
    export default {
        props: ["cart"],
        data() {
            return {
                name: "",
                number: "",
                myArray: []
            };
        },
        methods: {
            onItemTap(event) {
                this.$emit("removeProduct", event.item);
            },
            submitOrder() {
                if (this.name == 0 || this.number == 0) {
                    alert("Please Enter Your Name & Number");
                } else {
                    let webstore = this;
                    for (var i = 0; i < this.cart.length; i++) {
                        var myLesson = {
                            name: this.name,
                            number: this.number,
                            subject: this.cart[i].id,
                            NumberOfSpace:this.cart[i].NumberOfSpace
                        };
                        this.myArray.push(myLesson);
                    }
                    fetch("https://cst3010.herokuapp.com/collection/order", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.myArray)
                    });
                    alert(
                        "An order is placed by " + this.name + " at " +
                        this.number
                    );
                }
            },
        }
    };
</script>