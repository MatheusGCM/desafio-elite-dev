import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  registerUser,
  type RegisterUserResponse,
} from "../services/register-user";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "../store/user-store";

export function Register() {
  const navigate = useNavigate();
  const { saveUser } = useUserStore();
  const [name, setName] = useState("");

  const { mutateAsync: registerUserFn, isPending } = useMutation<
    RegisterUserResponse,
    Error,
    string
  >({
    mutationFn: async (userName) => await registerUser(userName),
    onSuccess: ({ id, name }) => {
      const userData = { id, name };
      saveUser(userData);
      localStorage.setItem("@user", JSON.stringify(userData));
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("Erro ao registrar usuário. Tente novamente.");
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await registerUserFn(name);
  }
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="space-y-10 rounded-lg bg-zinc-900 p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-6xl font-bold uppercase text-red-600">
            Filmezando
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Faça seu registro para começar a usar o Filmezando!
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name" className="mb-1">
            Nome
          </label>
          <input
            required
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="border border-zinc-600 p-2 rounded-md placeholder:text-zinc-400"
          />

          <button
            disabled={isPending}
            type="submit"
            className="flex justify-center mt-6 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 cursor-pointer"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
