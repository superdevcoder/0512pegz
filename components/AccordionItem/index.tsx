import React, { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";

import styles from "./AccordionItem.module.scss";

const AccordionItem: React.FC<{
    id: number;
    question: string;
    answer: string;
}> = ({ id, question, answer }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className={styles.accordionItem}>
            <button onClick={() => setOpen(!open)} className={styles.question}>
                <h3>{question}</h3>
                {!open ? (
                    <img src="images/plus.svg" alt="Show more" />
                ) : (
                    <img src="images/minus.svg" alt="Show less" />
                )}
            </button>

            <div className={`${styles.answer} ${open ? styles.open : ""}`}>
                <MarkdownRenderer markdown={answer} />
            </div>
        </li>
    );
};

export default AccordionItem;
