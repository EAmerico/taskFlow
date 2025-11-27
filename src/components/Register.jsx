import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { auth } from "../../src/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== "" && senha !== "") {
      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch(() => {});
    } else {
      setErro("Preencha todos os campos");
    }
  }

  return (
    <div class="bg-[#15171a] flex flex-col items-center justify-center h-screen w-full ">
      <h1 class="text-[70px] text-[#FFF]  ">Cadastre-se</h1>
      <span class="text-[16px] mb-[8px] text-[#FFF] mt-[-14px]">
        Vamos criar sua conta!
      </span>
      {erro && (
        <div className="w-full max-w-md mx-auto mt-4 animate-in fade-in duration-600">
          <Alert
            variant="destructive"
            className="rounded-xl shadow-lg bg-red-100 text-red-700 border border border-red-300"
          >
            <AlertTitle className="text-[16px]">Erro ao Cadastrar!</AlertTitle>
            <AlertDescription className="text-[15px]">
              Preencha todos os campos
            </AlertDescription>
          </Alert>
        </div>
      )}
      ;
      <form
        onSubmit={handleRegister}
        class="flex flex-col w-[90%] max-w-[600px] flex items-center justify-center "
      >
        <input
          class="w-full h-[40px] text-[14px] flex flex-col px-2 py-3 text-[#000] bg-[#FFF] border-0 rounded-[4px] mb-[12px] placeholder:text-gray-400 placeholder:text-[14px]"
          type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          class="w-full h-[40px] flex flex-col px-[6px] text-[#000] bg-[#FFF] border-0 rounded-[4px] mb-[12px] placeholder:text-gray-400 placeholder:text-[14px]"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button class="cursor-pointer h-[36px] w-full text-[18px] border-0 bg-[#3366ff] text-[#FFF] hover:bg-[#FFF] hover:text-[#3366ff] hover:transition duration-500 hover:-translate-y-[2px] transition duration-300">
          Cadastrar
        </button>
        <Link
          class="text-[#b4b8bb] text-[14px] m-[8px] hover:-translate-y-[2px] transition duration-500 hover:text-[#FFF]"
          to="/"
        >
          Já possui uma conta? Faça login!
        </Link>
      </form>
    </div>
  );
}

export default Register;
