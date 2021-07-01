export default function Danger(props) {
  return (
    <div className="alert alert-danger mb-0 mt-3" role="alert">
      {props.message}
    </div>
  );
}
