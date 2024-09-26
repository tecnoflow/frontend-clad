import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUser } from "@clerk/clerk-react";
import { DownloadCloudIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT

interface Client {
  _id: string;
  razonSocial: string;
  representanteLegal: string;
}

export default function Clients() {
    const {isSignedIn, isLoaded} = useUser();
    const navigate = useNavigate();
    const [clients, setClients] = useState<Client[]>([]);
   
    useEffect(() => {
        // Asegurarse de que Clerk esté completamente cargado antes de redirigir
        if (isLoaded && !isSignedIn) {
          return navigate('/sign-in');
        }
        fetchClientData();
              
      }, [isSignedIn, isLoaded, navigate]);

      const fetchClientData = async () => {
        const response = await fetch(`${VITE_ENDPOINT}/business/66f29c225229ba5d6f7444fe`, {
          method: 'GET',
        });
        const result = await response.json();
        setClients(result);
      }
   
  return (
    <Card>
      <CardHeader className="px-7">
        <div className="flex items-center justify-between">
        <CardTitle>Listado de clientes</CardTitle>
        <CardDescription>
          <Button variant="default" onClick={()=> navigate('/form/clad')}><PlusCircleIcon/> 
          <span className="ml-2">Nuevo Cliente</span>  
          </Button>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Cliente</TableHead>
              <TableHead className="hidden md:table-cell text-center">Razon Social</TableHead>
              <TableHead className="text-center">Acciones</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              clients.map(({_id, razonSocial, representanteLegal}) => (
                  <TableRow key={_id}>
                    <TableCell>
                      <div  className="text-center"> <span className="font-bold">{razonSocial}</span></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{representanteLegal}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="default">
                        <a className="flex" href={`${VITE_ENDPOINT}/download/${_id}`}>
                        <DownloadCloudIcon/> <span className="ml-2">Descargar</span>  
                        </a>
                        </Button>
                    </TableCell>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
