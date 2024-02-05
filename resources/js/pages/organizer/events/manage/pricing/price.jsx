import { Form } from "@/js/components/form";
import { Input } from "@/js/based/form";
import Breakdown from "./components/price/breakdown";

export default function Price({ control, event, errors }) {
    return (
        <div className="w-full md:w-4/5 flex items-start justify-center mt-32">
            <Form className="w-full md:w-1/3 flex flex-col gap-y-2">
                <div>
                    <Input
                        type="number"
                        min="0"
                        title="Price"
                        error={errors?.price}
                        disabled={event.is_free}
                        value={event.is_free ? 0 : control.data.price}
                        onChange={(e) => control.setPrice(e.target.value)}
                    />
                </div>
                <Breakdown event={event} price={control.data.price} />
            </Form>
        </div>
    );
}
