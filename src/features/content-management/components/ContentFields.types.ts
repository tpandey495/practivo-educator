export interface ContentFieldsProps {
    control: any;
    errors: any;
    clearErrors: (name?: any) => void;
    watch?: any;
    fields?: Array<any>;
    append?: (value: any) => void;
    remove?: (index: number) => void;
    setValue?: (name: string, value: any, options?: any) => void;
}


