<template>
    <div class="container component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my name</button>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
              <!-- to make it dinamic I have to add v-bind: or shorthand : to the property -->
              <!-- v-on or shorthand @ to listen for the event-->
              <app-user-detail
                :myName="name"
                @nameWasReset="name = $event"
              >
              </app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
      name: 'User',
      data: function () {
        return {
          name: 'Max'
        }
      },
      methods: {
        changeName: function () {
          this.name = 'Bea'
        },
        resetName() {
          this.name = 'Rui'
        }
      },
      components: {
        appUserDetail: UserDetail,
        appUserEdit: UserEdit
      }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
