import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { auth, db } from "../firebaseConnection";
import { signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function Admin() {
  const [tarefa, setTarefa] = useState("");
  const [user, setUser] = useState({});
  const [erro, setErro] = useState(null);
  const [edit, setEdit] = useState({});

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });

          console.log(lista);
          setTarefas(lista);
        });
      }
    }

    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (tarefa === "") {
      setErro(true);
      return;
    }

    if (edit?.id) {
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefa,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        console.log("tarefa registrada");
        setTarefa("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function deleteTarefa(id) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  async function editTarefa(item) {
    setTarefa(item.tarefa);
    setEdit(item);
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit?.id);
    await updateDoc(docRef, {
      tarefa: tarefa,
    })
      .then(() => {
        console.log("Tarefa atualizada");
        setTarefa("");
        setEdit({});
      })
      .catch(() => {
        console.log("erro ao atualizar");
        setTarefa("");
        setEdit({});
      });
  }

  return (
    <div class="bg-[#15171a] flex flex-col items-center h-screen">
      <h1 class="text-[42px] mt-[16px] text-[#FFF] font-bold ">Minhas tarefas</h1>
      {erro && (
        <div class="mt-[12px]">
          <Alert
            variant="destructive"
            className="rounded-xl shadow-lg bg-red-100 text-red-700 border border border-red-300 duration-400 mb-[16px]"
          >
            <AlertTitle className="text-[16px]">Digite uma tarefa!</AlertTitle>
            <AlertDescription className="text-[15px]">
              Preencha o campo para continuar.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <form onSubmit={handleRegister} class="w-full max-w-[600px] mx-auto">
        <textarea
          class="w-full h-[80px] flex flex-col p-[10px] text-[#000] bg-[#FFF] border-0 rounded-[4px] mt-[12px] mb-[12px] placeholder:text-gray-500
          placeholder:text-[14px]"
          placeholder="Digite sua tarefa..."
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />

        {Object.keys(edit).length > 0 ? (
          <button class="cursor-pointer h-[36px] w-full text-[18px] border-0 rounded-[4px] bg-[#3366ff] text-[#FFF] hover:bg-[#FFF] hover:text-[#3366ff] hover:transition duration-500 hover:-translate-y-[2px] transition duration-300 mb-[12px]">
            Atualizar tarefa
          </button>
        ) : (
          <button class="cursor-pointer h-[36px] w-full text-[18px] border-0 rounded-[4px] bg-[#3366ff] text-[#FFF] hover:bg-[#FFF] hover:text-[#3366ff] hover:transition duration-500 hover:-translate-y-[2px] transition duration-300 mb-[12px]">
            Registrar tarefa
          </button>
        )}
      </form>
      {tarefas.map((item) => (
        <article
          key={item.id}
          class="text-[#fff] w-[90%] max-w-[600px] mb-[16px] mt-[14px] flex flex-col bg p-[12px] bg-gray-900 border-0 rounded-[4px]"
        >
          <p class="mb-[10px]">{item.tarefa}</p>

          <div>
            <button
              onClick={() => editTarefa(item)}
              class="mr-[8px] rounded-[4px] p-[2px] hover:transition duration-500 hover:-translate-y-[2px] cursor-pointer bg-gray-200 text-[#000]"
            >
              Editar
            </button>
            <button
              onClick={() => deleteTarefa(item.id)}
              class="mr-[8px] border-0 rounded-[4px] p-[2px] hover:transition duration-500 hover:-translate-y-[2px] cursor-pointer bg-transparent text-[#ffcc23]"
            >
              Concluir
            </button>
          </div>
        </article>
      ))}
      <button
        onClick={handleLogout}
        class="absolute bottom-[6%] left-[4%] border-0 bg-[rgba(219,38,41,0.35)] text-[#fafafa] hover:bg-[rgba(219,38,41,1)] transition duration-400 rounded-[30px] hover:-translate-y-[2px] p-[4px] h-[60px] w-[60px] cursor-pointer font-bold"
      >
        Sair
      </button>
    </div>
  );
}

export default Admin;
