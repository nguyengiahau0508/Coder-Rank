import { Injectable } from "@angular/core";
import { Rating } from "../models/rating.model";
import { sampleRatings } from "../../mock/ratings.sample";
import { UsersService } from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratings: Rating[] = sampleRatings

  constructor(private usersService: UsersService) { }

  getShortGlobalRanking() {
    
  }
}
