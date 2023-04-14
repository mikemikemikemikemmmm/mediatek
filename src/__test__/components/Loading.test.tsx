import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { Loading } from "../../components/Loading";

describe('loading', () => {
    beforeEach(() => {
        cleanup()
    })
    it('test props with true', () => {
        render(<Loading isLoading={true} />)
        expect(screen.queryByTestId('loadingContainer')).toBeTruthy()
    })
    it('test props with true', () => {
        render(<Loading isLoading={false} />)
        expect(screen.queryByTestId('loadingContainer')).toBeNull()
    })

})