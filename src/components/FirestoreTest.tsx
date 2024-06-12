import PageLayout from "./PageLayout.tsx";
import {useEffect, useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import {Database} from "../firebase_app.ts";
import {useTranslation} from "../contexts/TranslationContext.tsx";

const FirestoreTest = () => {
    const { predefined } = useTranslation()
    const [state, setState] = useState<"running" | "success" | "failed">("running")

    const callFirestore = async () => {
        try {
            const docRef = (await getDocs(collection(Database, "test")));
            setState(docRef.docs.length > 0 ? "success" : "failed");
        } catch (e){
            setState("failed")
        }
    }

    useEffect(() => {
        callFirestore().then(() => {})
    }, []);

    return <PageLayout>
        <div className={"fixed top-0 left-0 w-screen h-screen flex justify-center items-center opacity-0 animate-slidein [--slidein-delay:100ms]"}>
            <div className={"flex flex-col text-center items-center"}>
                <div className={"sm:block hidden"}>
                    <h1 className={"text-hero-highlight-1 pb-4"}>
                        { state === "running" ? predefined.firestoreTestRunning : (state === "success" ? predefined.firestoreTestSuccess : predefined.firestoreTestFailed) }
                    </h1>
                </div>
                <div className={"sm:hidden block"}>
                    <h1 className={"text-hero-highlight-1-md pb-2"}>
                        { state === "running" ? predefined.firestoreTestRunning : (state === "success" ? predefined.firestoreTestSuccess : predefined.firestoreTestFailed) }
                    </h1>
                </div>
            </div>
        </div>
    </PageLayout>
}

export default FirestoreTest;