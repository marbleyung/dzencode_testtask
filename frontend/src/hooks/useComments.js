import { useMemo } from "react";

export const useSortedComments = (comments, sortMethod) => {
    const sortedComments = useMemo(() => {
        if (sortMethod) {
            return [...comments].sort(
                (a, b) => {
                    const stringSorts = ['owner', 'email']
                    if (stringSorts.includes(sortMethod)) {
                        return a[sortMethod].localeCompare(b[sortMethod])
                    } else if (sortMethod.startsWith('-')) {
                        const reversedSortMethod = sortMethod.substring(1); // Remove the leading '-'
                        return new Date(b[reversedSortMethod]) - new Date(a[reversedSortMethod]);
                    } else {
                        return new Date(a[sortMethod]) - new Date(b[sortMethod])
                    }
                })
        } else {
            return comments
        }
    }, [sortMethod, comments])
    return sortedComments
}
