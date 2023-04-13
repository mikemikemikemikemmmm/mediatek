export const Loading = (props: { isLoading: boolean }) => {
    if (props.isLoading) {
        return <div className="loadingContainer"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>

    }
    else {
        return null
    }
}