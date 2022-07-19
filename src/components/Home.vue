<template>
  <div class="hello">
    <h2>Les ZinZins (FireBase/FireStore)</h2>
    <!-- SEP -->
    <form @submit.prevent="addTodo" class="publish_party">
      <input
        type="text"
        class="text_to_publish"
        placeholder="Veuillez saisir votre text..."
        v-model="textToPub"
      />
      <input
        type="button"
        value="Publier"
        class="publish_button"
        @click="addTodo"
      />
    </form>
    <!-- SEP -->
    <div class="err">
      <div class="check"></div>
      <p></p>
    </div>
    <!--SEP-->
    <div class="list">
      <div class="item_in_list" v-for="todo in todoInDB" :key="todo._id">
        <input type="text" class="li" :value="todo.name" readonly />
        <div class="options">
          <!-- <div class="edit_option" @click="editTodo(todo._id)">
            <i class="fa-solid fa-pen-to-square"></i>
          </div> -->
          <div class="del_option" @click="Delete(todo._id)">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import db from "../firebase/db";
import {
  collection,
  addDoc,
  orderBy,
  query,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default {
  setup() {
    const textToPub = ref(null);
    const textToEdit = ref(null);
    const todoInDB = ref([]);

    // ADDING FUNCTION
    const addTodo = async function () {
      if (textToPub.value === null) return;
      await addDoc(collection(db, "users"), {
        name: textToPub.value,
        _id: Date.now(),
      });
      textToPub.value = "";
    };

    // EDIT FUNCTION
    const editTodo = async function (_id) {
      const docInCollection = doc(db, "users", _id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docInCollection, {
        name: "NV-TXT",
      });
    };

    // DELETE FUNCTION
    const Delete = async function (id) {
      await deleteDoc(doc(db, "users", id));
    };

    //LECTURE FUNCTION
    onMounted(async function () {
      //   const dataOnFireBase = await getDocs(collection(db, "users"));
      onSnapshot(
        query(collection(db, "users"), orderBy("_id")),
        function (dataOnFireBase) {
          const todoToPush = [];
          dataOnFireBase.forEach(async function (doc) {
            const todo = {
              _id: doc.id,
              name: doc.data().name,
            };
            todoToPush.push(todo);
          });
          todoInDB.value = todoToPush;
        }
      );
    });

    return {
      addTodo,
      editTodo,
      Delete,
      textToPub,
      textToEdit,
      todoInDB,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.publish_party {
  height: 3rem;
  margin-bottom: 5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.text_to_publish,
.publish_button {
  border: none;
}
.text_to_publish {
  width: 13rem;
  text-align: center;
  opacity: 50%;
  height: 100%;
}
.text_to_publish:focus {
  outline: none;
}
.publish_button {
  width: 5rem;
  transition: 0.3s;
  cursor: pointer;
  height: 3.2rem;
}
.publish_button:hover {
  background-color: #ffee57;
}
.publish_button:focus {
  border: none;
  outline: none;
  background-color: #ffee57;
}

/* ERR */

.err p {
  color: #00000037;
  font-size: 1.5rem;
  font-family: Monospace;
}
.err .check i {
  padding: 1.5rem;
  border-radius: 50%;
  background-color: #00000037;
  font-size: 1.5rem;
}
.err {
  transition: 0.4s cubic-bezier(1, 0, 0, 1);
}

/* LIST */

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}
.item_in_list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin-bottom: 1rem;
}
.item_in_list .li {
  height: 100%;
  width: 20rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 3rem;
  text-align: center;
  list-style: none;
  background-color: white;
  box-shadow: #959da533 0px 8px 24px;
}
.item_in_list .li:focus {
  outline: none;
}
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 6.5rem;
}

.del_option,
.edit_option {
  height: 100%;
  width: 3rem;
}
.item_in_list i {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: #959da533 0px 8px 24px;
}
.fa-pen-to-square {
  margin-right: 0.5rem;
  background-color: #f0f0f0;
}
.fa-pen-to-square:hover {
  background-color: #ffee57;
}
.fa-trash {
  background-color: #f0f0f0;
}
.fa-trash:hover {
  background-color: #ff5a5a;
}
</style>
