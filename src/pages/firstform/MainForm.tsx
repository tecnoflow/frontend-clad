import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth, useUser } from "@clerk/clerk-react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT

const formSchema = z.object({
    razonSocial: z.string().min(2).max(60),
    nit: z.string().regex(/^\d+-\d{1}$/),
    direccion: z.string().min(5).max(60),
    ciudad: z.string().min(5).max(60),
    representanteLegal: z.string().min(5).max(60),
    documento: z.string().min(2),
    cedula: z.string().min(6),
    telefono: z.string().min(7),
    paginaWeb: z.string().optional(),
    correo: z.string().email(),
    importacion: z.boolean().default(false),
    exportacion: z.boolean().default(false),
    regimen: z.string().min(5),
    ICA: z.boolean().default(false), 
    actividadEconomica: z.string().min(4).max(5),
    codigoPostal: z.string().min(5),
  })

export const MainForm = () => {

    const { userId, isLoaded } = useAuth()
    const { id } = useParams();
    const { toast } = useToast()
    const data = useUser();
    const navigate = useNavigate()

    useEffect(() => {
      if (isLoaded && !userId) {
        navigate("/sign-in")
    }
    }, [isLoaded])
    
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          razonSocial: "",
          nit: "",
          representanteLegal: "",
          cedula: "",
          direccion: "",
          ciudad: "",
          telefono: "",
          documento: 'CC',
          paginaWeb: '',
          correo: "",
          regimen: "",
          ICA: false ,
          codigoPostal: "",
         actividadEconomica: "",
          importacion: false,
          exportacion: false
        },
      })
      
      if (!isLoaded) return "Loading...";

      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if(!values.exportacion && !values.importacion){
          toast({
            variant:"destructive",
            title: "Error",
            description: "Selecciona al menos importación o exportación",
          })
          }else{
            
           const responseValues = {...values};
           // @ts-expect-error switch types
           responseValues.importacion = new Boolean(responseValues.importacion).toString();
           // @ts-expect-error switch types
           responseValues.exportacion = new Boolean(responseValues.exportacion).toString();
           // @ts-expect-error switch types
           responseValues.ICA  = new Boolean(responseValues.ICA).toString();

            toast({
              variant:"success",
              title: "Información almacenada",
              description: "Puede abandonar la página",
            })
            //TODO: SEND CLAD ID
            const response = await fetch(`${VITE_ENDPOINT}/66f29c225229ba5d6f7444fe`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(responseValues)
            });
            const result = await response.json();
            console.log(result)
            navigate("/");
        }
      }
    

  return (
    <>
    <h1 style={{marginBottom:'15', fontWeight:'bold'}}>Formulario de cliente {id}</h1>
    <p>Con los datos siguientes vamos a realizar a la creación de la documentación requerida para el puerto</p>
    <Button variant={'link'}>
          <a className="flex" href={`/`}>
                        <span className="ml-2 text-red-400">Atras</span>  
                        </a>
          </Button>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="razonSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre o Razón social</FormLabel>
              <FormControl>
                <Input placeholder="razón social" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="representanteLegal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Representante Legal</FormLabel>
              <FormControl>
                <Input placeholder="representante legal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="correo electrónico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>nit</FormLabel>
              <FormControl>
                <Input placeholder="nit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="documento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo Documento</FormLabel>
              <FormControl>
                <Input placeholder="Tipo Documento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="cedula"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cédula</FormLabel>
              <FormControl>
                <Input placeholder="Cédula" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Direccion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="ciudad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input placeholder="Ciudad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Telefono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
     
      <FormField
          control={form.control}
          name="paginaWeb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Página Web</FormLabel>
              <FormControl>
                <Input placeholder="paginaWeb" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
      <FormField
          control={form.control}
          name="regimen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Régimen</FormLabel>
              <FormControl>
                <Input placeholder="Regimen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="actividadEconomica"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Actividad Económica CIIU </FormLabel>
              <FormControl>
                <Input placeholder="Actividad Economica" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="codigoPostal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Postal</FormLabel>
              <FormControl>
                <Input placeholder="Codigo Postal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="ICA"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <div className="space-y-1 leading-none">
                <FormLabel>
                es ICA ? 
                </FormLabel>
              </div>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="importacion"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <div className="space-y-1 leading-none">
                <FormLabel>
                 Importación
                </FormLabel>
              </div>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      
      <FormField
          control={form.control}
          name="exportacion"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Exportación
                </FormLabel>
              </div>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />


        
        <Button type="submit">Guardar y generar</Button>
      </form>
    </Form>
    </>
  )
}
