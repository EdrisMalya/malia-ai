'use client'
import * as z from 'zod'
import React, {useState} from 'react';
import Heading from "@/components/Heading";
import {ChatBubbleLeftIcon, MusicalNoteIcon} from "@heroicons/react/24/outline";
import {useForm} from "react-hook-form";
import {formSchema} from "./constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import axios from "axios";
import Empty from "@/components/empty";
import {Loader} from "@/components/loader";

const MusicPage = () => {
    const [music, setMusic] = useState<string>()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            setMusic(undefined)
            const response = await axios.post('/api/music', values)
            setMusic(response.data.audio)
            form.reset()
        }
        catch (e: any){
            console.log('Error: ', e)
        }
        finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title={'Mucus generation'}
                description={'Turn your prompt into music'}
                icon={<MusicalNoteIcon className={'w-10 h-10 text-emerald-500'} />}
                bgColor={'bg-emerald-500/10'}
            />
            <div className={'px-4 lg:px-8'}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                            rounded-lg
                            border
                            w-full
                            p-4
                            px-3
                            md:px-6
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                          "
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Piano Solo"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                            Generate
                        </Button>
                    </form>
                </Form>
                <div className={'space-y-4 mt-4'}>
                    {isLoading && (
                        <div className={`
                            p-8 
                            rounded-lg 
                            w-full 
                            flex 
                            items-center
                            justify-center
                            bg-muted 
                        `}>
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty label={'No music generated'} />
                    )}
                    {music && (
                        <audio controls={true} className={'w-full mt-12'}>
                            <source src={music}/>
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MusicPage;