<template>
    <Page style="background-color: gray">
        <ActionBar title="Subject Store" />
        <Label text="Welcome to the School Lesson Depot" class="h2"
            style="color:black;" />
        <TabView>
            <TabViewItem title="Lessons" class="h2 text-capitalize">
                <StackLayout>
                    <LessonList @addProduct="addToCart" :lessons="lessons" />
                </StackLayout>
            </TabViewItem>
            <TabViewItem title="Checkout" class="h2 text-capitalizae">
                <StackLayout>
                    <CheckOut :cart="cart" :lessons="lessons"
                        @removeProduct="removeFromCart" />
                </StackLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import LessonList from "./LessonList";
    import CheckOut from "./CheckOut";
    export default {
        data() {
            return {
                cart: [],
                myArray: []
            };
        },
        components: {
            LessonList,
            CheckOut
        },
        methods: {
            addToCart(lesson) {
                let webstore = this;
                this.cart.push(lesson);
                lesson.addedLessons++;

                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].NumberOfSpace == 0) {
                        alert("No subject Available");
                        this.cart.splice(lesson, 1);
                    } else {
                        for (var i = 0; i < this.cart.length; i++) {
                            var newLesson = {
                                NumberOfSpace: webstore.cart[i]
                                    .NumberOfSpace -
                                    this.cart[i].addedLessons
                            };
                            var lessonID = this.cart[i]._id;
                            fetch(
                                "https://cst3010.herokuapp.com/collection/lessons/" +
                                lessonID +
                                "", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(newLesson)
                                }
                            );
                        }
                        alert(lesson.subject + " has been added to cart");
                    }
                }
            },
            removeFromCart(lesson) {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i] == lesson) this.cart.splice(i, 1);
                }
            }
        }
    };
</script>

<style>
</style>