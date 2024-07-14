"use client"

import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { IngressInput } from "livekit-server-sdk";

import { AlertTriangle } from "lucide-react";
import { ElementRef, startTransition, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;



const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null); // refer a button
    const [ingressType,setIngressType] = useState<IngressType>(RTMP);
    const [isPending,startTransition] = useTransition();
    const onSubmit = ()  =>{
        startTransition(
            ()=>{
                createIngress( parseInt(ingressType))
                .then(()=>{toast.success("ingress created"); closeRef?.current?.click();}) // click on close button using reference
                .catch(()=>{toast.error("Something went wrong")});
    
            }
        )
    }
    return (
    <Dialog>
       <DialogTrigger asChild>
        <Button variant="primary"> Generate Connection </Button>

       </DialogTrigger>

       <DialogContent>
            <DialogHeader>
                <DialogTitle>Generate Connection</DialogTitle>
            </DialogHeader>
             <Select disabled={isPending} value={ingressType} onValueChange={(value)=>setIngressType(value)} >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ingress Type"></SelectValue>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value={RTMP}>RTMP</SelectItem>
                    <SelectItem value={WHIP}>WHIP</SelectItem>
                </SelectContent>

             </Select>
            <Alert>
                <AlertTriangle className="h-4 w-4"></AlertTriangle>
                <AlertTitle></AlertTitle>
                <AlertDescription>
                    This action will reset all active streams using the current connection
                </AlertDescription>
            </Alert>
            <div className="flex justify-between">
                 {/* pass down property */}
                <DialogClose ref={closeRef} asChild> 
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                    <Button disabled={isPending} variant="primary" 
                    onClick={onSubmit}>Generate</Button>

            </div>


       </DialogContent> 
    </Dialog> 
     );
}
 
export default ConnectModal;