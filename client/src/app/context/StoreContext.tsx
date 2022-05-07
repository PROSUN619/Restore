import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../../models/basket";

interface StoreContextValue{
    basket:Basket | null;
    setBasket: (basket:Basket) => void;
    removeItem: (productId:number, quantiry:number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext); //creating our custom react hooks

    if (context === undefined){
        throw Error('Ooops - we do not seem to be inside the provider');
    }
    return context;    
}

export function StoreProvider({children}:PropsWithChildren<any>){
    const [basket,setBasket] = useState<Basket | null>(null);

    function removeItem(productId:number, quantiry: number){
        debugger;
        if (!basket) return;
        const items = [...basket.items]; //creating new instance of basket item as react recommend that do not mutate
        //original array
        const itemIndex= items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0){
            items[itemIndex].quantity -= quantiry;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex,1);
            setBasket(prevState => {
                return {...prevState!,items} //change the previous state with newstate
                //! used to override the safety check
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket,removeItem}}>
                {children}
        </StoreContext.Provider>
    )
}