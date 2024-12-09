function SpanLine({ title, description, classDesc }) {
    return (
        <div>
            <li className="block lg:flex w-full p-4 border-b border-b-black/10 dark:border-b-white/10 contrast-more:border-b-black/50 contrast-more:dark:border-b-white/50">
                <span className="self-center block w-64 mb-1 font-semibold lg:inline-block lg:mb-0">
                    {title}
                </span>
                <div className="w-full">
                    <span className={`font-mono ${classDesc}`}>
                        {description}
                    </span>
                </div>
            </li>
        </div>
    );
}
export default SpanLine;
