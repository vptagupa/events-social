import { Button } from "@/js/components/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faXTwitter,
    faGithub,
    faSlack,
    faGoogle,
    faApple,
} from "@fortawesome/free-brands-svg-icons";

export default function Socialite() {
    return (
        <>
            <div className="flex gap-x-2">
                <div>
                    <Button className="hover:animate-bounce flex justify-center items-center text-center !text-[0.7rem] text-slate-700 uppercase !px-3 !py-1 bg-slate-100 !shadow-slate-300/70">
                        <FontAwesomeIcon
                            icon={faGoogle}
                            className="h-[0.7rem] text-green-600"
                        />
                        <span>oogle</span>
                    </Button>
                </div>
                <div>
                    <Button className="hover:animate-bounce flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            className="h-[0.7rem] text-indigo-800"
                        />
                        <span>Facebook</span>
                    </Button>
                </div>
                <div>
                    <Button className="hover:animate-bounce flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70">
                        <FontAwesomeIcon
                            icon={faXTwitter}
                            className="h-[0.7rem] text-cyan-600"
                        />
                        <span>Twitter</span>
                    </Button>
                </div>
            </div>
            <div className="flex gap-x-2">
                <div>
                    <Button className="hover:animate-bounce flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70">
                        <FontAwesomeIcon
                            icon={faApple}
                            className="h-[0.7rem] text-slate-600"
                        />
                        <span>Apple Id</span>
                    </Button>
                </div>
                <div>
                    <Button className="hover:animate-bounce flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70">
                        <FontAwesomeIcon
                            icon={faSlack}
                            className="h-[0.7rem] text-pink-600"
                        />
                        <span>Slack</span>
                    </Button>
                </div>
                <div>
                    <Button className="hover:animate-bounce flex space-x-1 justify-center items-center text-center text-slate-700 uppercase !text-[0.7rem] !px-3 !py-1 bg-slate-100 !shadow-slate-300/70">
                        <FontAwesomeIcon
                            icon={faGithub}
                            className="h-[0.7rem]"
                        />
                        <span>Github</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
