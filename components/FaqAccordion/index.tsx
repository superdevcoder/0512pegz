import React from "react";
import { Faq } from "../../types";

import AccordionItem from "../AccordionItem";

import styles from "./FaqAccordion.module.scss";

const Accordion: React.FC<{ faq: Faq[] }> = ({ faq }) => {
    return (
        <ul className={styles.faqAccordion}>
            {faq.map(({ id, question, answer }) => (
                <AccordionItem
                    key={id}
                    id={id}
                    answer={answer}
                    question={question}
                />
            ))}
        </ul>
    );
};

export default Accordion;
