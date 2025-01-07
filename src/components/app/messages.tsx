import { MailPlus } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


export function Messages() {
    return (
        <Sheet>
            <SheetTrigger>
                <MailPlus strokeWidth={1.75} className="text-1xl text-[#1A1C1E] mr-10 hover:text-black transition-colors duration-300" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Mensagens</SheetTitle>
                    <SheetDescription>
                    Esta parte será a última ser desenvolvida, logs e mensagens pessoais
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}