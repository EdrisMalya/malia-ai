'use client'
import * as z from 'zod'
import React, {useState} from 'react';
import Heading from "@/components/Heading";
import {ArrowDownTrayIcon, PhotoIcon} from "@heroicons/react/24/outline";
import {useForm} from "react-hook-form";
import {formSchema} from "@/app/(dashboard)/(routes)/image/constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {useRouter} from "next/navigation";
import axios from "axios";
import Empty from "@/components/empty";
import {Loader} from "@/components/loader";
import {amountOptions, resolutionOptions} from "@/app/(dashboard)/(routes)/image/constants";
import {SelectValue} from "@radix-ui/react-select";
import {Card, CardFooter} from "@/components/ui/card";

const ImagePage = () => {
    const router = useRouter();
    const [photos, setPhotos] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setPhotos([]);
            const response = await axios.post('/api/image', values);
            const urls = response.data.map((image: { url: string }) => image.url);

            setPhotos(urls);
        } catch (error: any) {
            if (error?.response?.status === 403) {
                /*proModal.onOpen();*/
            } else {
                /*toast.error("Something went wrong.");*/
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title={'Image generation'}
                description={'Turn your prompt into an image'}
                icon={<PhotoIcon className={'w-10 h-10 text-pink-700'} />}
                bgColor={'bg-pink-700/10'}
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
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="A picture of a horse in Swiss alps"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                            p-12 
                        `}>
                            <Loader />
                        </div>
                    )}
                    {photos.length === 0 && !isLoading && (
                        <Empty label={'No images generated'} />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {photos.map((src) => (
                            <Card key={src} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <img
                                        alt="Generated"
                                        src={src}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                                        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePage;