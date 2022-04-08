import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { MovieModel, NewsModel, PersonModel } from "../models/models";

let user = {};

if (localStorage.hasOwnProperty(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const UserReducer = (
  state = {
    userLogin: user,
    accountInfo: {},
    ticket: [],
    usersList: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_LOGIN": {
      if (action.userLogin) {
        localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin));
        localStorage.setItem(TOKEN, action.userLogin.accessToken);
        state.userLogin = action.userLogin;
      }
      return { ...state };
    }

    case "SET_ACCOUNT_INFO": {
      state.accountInfo = action.accountInfo;
      state.ticket = action.ticket;
      return { ...state };
    }

    case "SET_LIST_USERS": {
      state.usersList = action.usersList;
      return { ...state };
    }

    default:
      return state;
  }
};

const MovieReducer = (
  state = {
    movie: new MovieModel(),
    comingSoon: [],
    nowShowing: [],
    movieList: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_MOVIES_LIST": {
      state.movieList = action.movieList;
      state.comingSoon = state.movieList
        .filter((movie) => Date.parse(movie.ngayKhoiChieu) > Date.now())
        .reverse();
      state.nowShowing = state.movieList.filter(
        (movie) => Date.parse(movie.ngayKhoiChieu) < Date.now()
      );
      return { ...state };
    }

    case "GET_MOVIE_DETAIL": {
      state.movie = action.movie;
      return { ...state };
    }

    default:
      return state;
  }
};

const NewsReducer = (
  state = {
    newsList: [new NewsModel()],
    news: new NewsModel(),
    popular: [new NewsModel()],
    trending: [new NewsModel()],
  },
  action
) => {
  switch (action.type) {
    case "GET_NEWS_INFO": {
      state.news = action.news;
      return { ...state };
    }
    case "GET_NEWS_LIST": {
      state.newsList = action.newsList;
      return { ...state };
    }
    case "GET_NEWS_POPULAR": {
      state.popular = action.popular;
      return { ...state };
    }
    case "GET_NEWS_TRENDING": {
      state.trending = action.trending;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const CinemaReducer = (
  state = { movieShowtime: {}, seat: [], seatIsBooking: [], cinemaList: [] },
  action
) => {
  switch (action.type) {
    case "GET_CINEMA_SHOWTIME": {
      state.movieShowtime = action.movieShowtime;
      state.seat = action.seat;
      state.seatIsBooking = action.seatIsBooking;
      return { ...state };
    }

    case "SEAT_IS_BOOKING": {
      let seatUpdate = [...state.seatIsBooking];

      let index = seatUpdate.findIndex(
        (seat) => seat.maGhe === action.seatIsSelected.maGhe
      );

      if (index !== -1) {
        seatUpdate.splice(index, 1);
      } else {
        seatUpdate.push(action.seatIsSelected);
      }

      return { ...state };
    }

    case "GET_CINEMA": {
      state.cinemaList = action.cinemaList;
      return { ...state };
    }

    default:
      return state;
  }
};

const LoadingReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case "DISPLAY_LOADING": {
      state.isLoading = true;
      return { ...state };
    }
    case "HIDE_LOADING": {
      state.isLoading = false;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

const PeopleReducer = (
  state = {
    arrCast: [],
    person: new PersonModel(),
    acting: [],
    actor: [],
    totalPages: 0,
  },
  action
) => {
  switch (action.type) {
    case "GET_PEOPLE": {
      state.arrCast = action.arrCast;
      return { ...state };
    }

    case "GET_PERSON": {
      state.person = action.person;
      return { ...state };
    }

    case "GET_ACTING": {
      state.acting = action.acting;
      return { ...state };
    }

    case "GET_ACTOR": {
      state.actor = action.actor;
      state.totalPages = action.totalPages;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const ModalVideoReducer = (
  state = { status: { isOpen: false, videoId: "" } },
  action
) => {
  switch (action.type) {
    case "SET_STATUS": {
      state.status = action.status;
      return { ...state };
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  UserReducer,
  MovieReducer,
  NewsReducer,
  CinemaReducer,
  LoadingReducer,
  PeopleReducer,
  ModalVideoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));