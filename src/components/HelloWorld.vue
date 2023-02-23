<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Content goes here -->
            {{users}}
        </div>
    </div>
</template>
<script>
    import { db } from '../config.js';

    export default {
        data() {
            return {
                users:[]
            }
        },
        created(){
            db.collection('users').onSnapshot((snapshotChange) => {
                this.users = [];
                snapshotChange.forEach((doc) => {
                    this.users.push({
                        key: doc.id,
                        fname: doc.data().fname,
                        lname: doc.data().lname,
                        service: doc.data().service
                    })
                });
            })
        },
        methods:{
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('users').add(this.user).then(() => {
                    alert("User successfully created!");
                    this.user.name = ''
                    this.user.email = ''
                    this.user.phone = ''
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>
