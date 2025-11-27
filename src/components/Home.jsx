import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { auth } from "../../src/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if ((email !== "") & (senha !== "")) {
      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
          // navegar para a pasta admin
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          setErro("Email ou senha invalidos");
          setEmail("");
          setSenha("");
        });
    }
  }
  return (
    <div class="bg-[#15171a] flex flex-col items-center justify-center h-screen w-full ">
      <h1 class="text-[70px] text-[#FFF] font-bold">TaskFlow</h1>
      <span class="text-[16px] mb-[8px] text-[#FFF] mt-[-14px]">
        Gerencie sua agenda de forma fácil.
      </span>
      {erro && (
        <div className="w-full max-w-md mx-auto mt-4 animate-in fade-in duration-600">
          <Alert
            variant="destructive"
            className="rounded-xl shadow-lg bg-red-100 text-red-700 border border border-red-300"
          >
            <AlertTitle className="text-[16px]">Erro ao logar!</AlertTitle>
            <AlertDescription className="text-[15px]">
              Email ou senha incorreta
            </AlertDescription>
          </Alert>
        </div>
      )}

      <form
        onSubmit={handleLogin}
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
          Acessar
        </button>
        <Link
          class="text-[#b4b8bb] text-[14px] m-[8px] hover:-translate-y-[2px] transition duration-500 hover:text-[#FFF]"
          to="/register"
        >
          Não possui uma conta? Cadastre-se
        </Link>
      </form>
    </div>
  );
}

export default Home;
