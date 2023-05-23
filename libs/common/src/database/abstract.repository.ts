import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { Connection, FilterQuery, Model, SaveOptions, Types, UpdateQuery } from "mongoose";
import { filter } from "rxjs";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger

    constructor(
        protected readonly model: Model<TDocument>,
        // private readonly connection: Connection
    ) { }


    async create(
        document: Omit<TDocument, '_id'>,
        options?: SaveOptions,
    ): Promise<TDocument> {
        const createdDoc = new this.model({
            ...document,
            _id: new Types.ObjectId
        })

        return (await createdDoc.save(options)).toJSON() as TDocument
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const doc = await this.model.findOne(filterQuery, {}, { lean: true })

        if (!doc) {
            this.logger.warn("Document not found with filterQuery", filterQuery)
            throw new NotFoundException('Document not found.')
        }

        return doc
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
        const doc = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true, new: true
        })

        if (!doc) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery)
            throw new NotFoundException('Document not found.')
        }

        return doc
    }

    async upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true, upsert: true, new: true
        })
    }

    async find(filterQuery:FilterQuery<TDocument>) {
        return this.model.find(filterQuery, {}, {lean:true})
    }

    // async startTransaction() {
    //     const session =  await this.connection.startSession()
    //     session.startTransaction()
    //     return session
    // }

}