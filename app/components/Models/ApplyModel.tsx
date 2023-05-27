import Model from "./Model";
import useApplyModel from "@/app/hooks/useApplyModel";

interface IAppProps {
}

const ApplyModel: React.FunctionComponent<IAppProps> = (props) => {
    const applyModel = useApplyModel();
    return (
        <Model
            isOpen={applyModel.isOpen}
            onClose={applyModel.onClose}
            onSubmit={applyModel.onClose}
            actionLabel="Submit"
            title="Your Online workspace"
        />
    )
};

export default ApplyModel;
