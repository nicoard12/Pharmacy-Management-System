import { useEffect, useRef, useState } from "react";
import { ClientType, createClient, updateClient } from "../../api/client";
import FormInput from "./FormInput";
import toast from "react-hot-toast";
import { getCleanErrorMessage } from "../../utils/error";

export function AddClient({
  close,
  refreshClients,
  client,
}: {
  close: () => void;
  refreshClients: (newClient: ClientType) => void;
  client?: ClientType;
}) {
  const [newClient, setNewClient] = useState<Omit<ClientType, "id">>({
    name: "",
    affiliateNumber: "",
    personInCharge: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const tryAddClient = async () => {
    try {
      const createdClient = await createClient(newClient);
      refreshClients(createdClient);
      toast.success("Cliente creado con éxito");
      close();
    } catch (error: any) {
      toast.error(
        `Error: ${getCleanErrorMessage(error) || "No se pudo crear"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const tryEditClient = async () => {
    try {
      const updatedClient = { id: client!.id, ...newClient };
      await updateClient(updatedClient);
      refreshClients(updatedClient);
      toast.success("Cliente editado");
      close();
    } catch (error: any) {
      toast.error(
        `Error: ${getCleanErrorMessage(error) || "No se pudo editar"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const confirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    client ? tryEditClient() : tryAddClient();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    const inputs = Array.from(
      formContainerRef.current?.querySelectorAll("input") || [],
    ) as HTMLInputElement[];

    const currentIndex = inputs.indexOf(
      document.activeElement as HTMLInputElement,
    );

    if (e.key === "ArrowDown" && currentIndex < inputs.length - 1) {
      e.preventDefault();
      inputs[currentIndex + 1].focus();
    } else if (e.key === "ArrowUp" && currentIndex > 0) {
      e.preventDefault();
      inputs[currentIndex - 1].focus();
    }
  };

  useEffect(() => {
    if (client) {
      setNewClient({
        name: client.name,
        affiliateNumber: client.affiliateNumber,
        personInCharge: client.personInCharge || "",
        phone: client.phone || "",
        email: client.email || "",
      });
    }
  }, [client]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target)
      ) {
        close();
      }
    };
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        ref={modalRef}
        className="p-5 bg-[var(--card)] text-[var(--text-card)] border border-[var(--card-border)] w-full max-w-lg max-h-[95vh] flex flex-col gap-3 rounded-lg shadow-2xl"
      >
        <h2 className="text-xl font-bold ">
          {client ? "Editar" : "Nuevo"} Cliente
        </h2>

        <form
          onSubmit={confirm}
          onKeyDown={handleKeyDown}
          className="flex flex-col flex-1 overflow-hidden gap-2"
        >
          <div
            ref={formContainerRef}
            className="flex flex-col gap-4 overflow-y-auto p-2"
          >
            <FormInput
              name="name"
              label="Nombre"
              value={newClient.name}
              handleChange={handleChange}
              placeholder="Ingresá el nombre (obligatorio)"
              required={true}
            />
            <FormInput
              name="affiliateNumber"
              label="Nº Afiliado"
              value={newClient.affiliateNumber}
              handleChange={handleChange}
              placeholder="Ingresá el N° de afiliado (obligatorio)"
              required={true}
            />
            <FormInput
              name="personInCharge"
              label="Responsable a Cargo"
              value={newClient.personInCharge!}
              handleChange={handleChange}
              placeholder="Ingresá el nombre del responsable a cargo"
            />
            <FormInput
              name="phone"
              label="Teléfono"
              value={newClient.phone!}
              handleChange={handleChange}
              placeholder="Ingresá un número de teléfono"
            />
            <FormInput
              name="email"
              label="Email"
              value={newClient.email!}
              handleChange={handleChange}
              placeholder="email@ejemplo.com"
            />
          </div>

          <div className="flex flex-1 justify-end items-center gap-3">
            <button
              type="button"
              onClick={close}
              className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg "
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer px-4 py-2 bg-[var(--button)] text-white hover:bg-[var(--button-hover)] rounded-lg font-medium "
            >
              {loading ? "Guardando..." : "Confirmar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClient;
