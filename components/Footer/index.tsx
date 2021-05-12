import Link from "next/link";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import styles from "./Footer.module.scss";

const url =
    "https://fun.us1.list-manage.com/subscribe/post?u=2e76eb2e3c1a766cef7a4cf7d&id=454dcf138b";

const Footer: React.FC = () => (
    <footer className={styles.footer}>
        © 2021 Chain/Saw
        <div>
            <h3>Sign Up For Drops</h3>
            <MailchimpSubscribe url={url} />
        </div>
    </footer>
);

export default Footer;
