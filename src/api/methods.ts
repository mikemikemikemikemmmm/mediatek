import { gql, } from '@apollo/client'
export const createQuery = () => {
  return gql`
    query {
        launches{
          mission_name,
          rocket {
            rocket_name,
            rocket_type
          },
          launch_date_local
        }
      }      
    `
}