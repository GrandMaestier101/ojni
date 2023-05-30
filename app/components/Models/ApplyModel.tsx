"use client";

import { useMemo, useState } from "react";
import Model from "./Model";
import useApplyModel from "@/app/hooks/useApplyModel";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";



enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    APPLY = 5
}

const ApplyModel = () => {
    const applyModel = useApplyModel();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            vacancyCount: 1,
            expCount: 0,
            workHour: 1,
            imageSrc: '',
            salary: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');

    const vacancyCount = watch('vacancyCount');
    const expCount = watch('expCount');
    const workHour = watch('workHour');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const setCustomValues = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if (step == STEPS.APPLY) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step == STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className=" flex flex-col gap-8">
            <Heading
                title="Which of these best describes your need?"
                subtitle="Pick a category"
            />
            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
             "
            >
                {categories.map((item) => (
                    <div key={item.label} className=" col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValues('category', category)}
                            selected={category == item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your company located?"
                    subtitle="Help people to find you"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValues('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className=" flex flex-col gap-4">
                <Heading
                    title="Share some information about your Company 🏛️"
                    subtitle="What kind of person you're looking for?"
                />

                <Counter
                    title=" Vacancy"
                    subtitle="How many positions are available?"
                    value={vacancyCount}
                    onChange={(value) => setCustomValues('vacancyCount', value)}
                />
                <hr />
                <Counter
                    title=" Experience"
                    subtitle="How many year experience is required?"
                    value={expCount}
                    onChange={(value) => setCustomValues('expCount', value)}
                />
                <hr />
                <Counter
                    title=" Working Hour"
                    subtitle="Daily working hours"
                    value={workHour}
                    onChange={(value) => setCustomValues('workHour', value)}
                />

            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading
                    title="Add a photo of your Company"
                    subtitle="Show them who they're working for"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValues('imageSrc', value)}
                />
            </div>
        )
    }

    return (
        <Model
            isOpen={applyModel.isOpen}
            onClose={applyModel.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
            title="Your Online workspace"
            body={bodyContent}
        />
    )
};

export default ApplyModel;
