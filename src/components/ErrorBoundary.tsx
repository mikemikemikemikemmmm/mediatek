import { Component } from "react";
type Props = { children: JSX.Element }
export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({
      hasError: true
    })
  }
  render() {
    if (this.state.hasError) {
      return <div className="errorBoundary">
        Something went wrong.
      </div>
    }
    return this.props.children;
  }
}