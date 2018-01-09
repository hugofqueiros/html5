<template>
    <div class="container component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my name</button>
        <p>Name is {{ name }}</p>
        <p>Age is {{ age }}</p>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
              <!-- to make it dinamic I have to add v-bind: or shorthand : to the property -->
              <!-- v-on or shorthand @ to listen for the event-->
              <!-- resetFn: callback passed to children acting as a callback tobe executed in the parent-->
              <app-user-detail
                :myName="name"
                @nameWasReset="name = $event"
                :resetFn="resetName"
                :userAge="age"
              >
              </app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit
                  :userAge="age"
                  @ageWasEdited="age = $event"
                ></app-user-edit>
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
          name: 'Max',
          age: 27
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
