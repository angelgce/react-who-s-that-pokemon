import { useEffect, useState } from "react"

export const Life = ({ lifes, count }: { lifes: number, count: number }) => {
    const [List, setList] = useState<number[]>([])

    const modifyList = () => {
        let newList: number[] = []
        setList([])
        for (let index = 0; index < 3; index++) {
            if (lifes > index) {
                newList.push(1)
            } else {
                newList.push(0)
            }
        }
        setList(newList)
        console.log(List)
    }





    useEffect(() => {
        modifyList();
    }, [lifes])

    return (
        <div>

            <div className="flex justify-center">
                {
                    List.map(item =>
                    (
                        item === 1 ? <img className="w-24 brightness-1000" src="https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/06/6420b-pikachu-sentado-png.png?resize=450%2C450&ssl=1" />
                            :
                            <img className="w-24 brightness-0" src="https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/06/6420b-pikachu-sentado-png.png?resize=450%2C450&ssl=1" />))
                }
                <div className="">
                    <span className="p-10 text-4xl text-blue-700 drop-shadow-md opacity-50 mx-7">x{count}</span></div>
            </div>

        </div>
    )
}
