import {createReducer} from '@reduxjs/toolkit'

const initialState = {
  showUser: '',
  profile: '',
  userSecretKey: '',
  industry: '',
  saveSearch: '',
  logIn: '',
}

// Add Post
export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase('SUBMITTED', (state, action) => {
    state.showUser = action.payload
  })
  builder.addCase('LOGIN', (state, action) => {
    state.logIn = action.payload
  })

  // Update Post
  builder.addCase('UPDATE', (state, action) => {
    // state = action.payload;

    const {oldId, title, description, postType, postId, color} = action.payload
    const update = state[0].posts.find((val) => val.id === oldId)

    if (update) {
      update.title = title
      update.description = description

      update.postType = postType
      update.postId = postId

      update.color = color
    }
  })
  builder.addCase('INDUSTRY', (state, action) => {
    // state = action.payload;
    // alert(action.payload.buttonTopbar)
    action.payload.buttonTopbar == state.industry
      ? (state.industry = false)
      : (state.industry = action.payload.buttonTopbar)
    // state.industry = action.payload.buttonTopbar
    state.saveSearch = action.payload.save
  })
  // Add Product
  builder.addCase('ADD_PRODUCT', (state, action) => {
    // console.log(action.payload);

    state[0].product.unshift(action.payload)
  })
  builder.addCase('SETKEY', (state, action) => {
    // console.log(action.payload);

    state.userSecretKey = action.payload
  })

  // DELETE DATA
  builder.addCase('PROFILE', (state, action) => {
    // console.log(action.payload)
    state.profile = action.payload

    // state[0].posts = action.payload
  })
})
